// module import
import { useRef, useState, useContext } from "react"
import usePictureInPicture from "react-use-pip"
import { Navigate } from "react-router-dom";
import { context } from "../ContextApi/ContextApi";
// style import 
import styles from "../styles/ScreenJsx.module.css"

export const ScreenJsx = () => {
    // login related
    const { logged } = useContext(context);
    // media related
    const [permission, setPermission] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [stream, setStream] = useState(null);
    const [screenRecording, setScreenRecording] = useState(null);
    const [localRecording, setLocalRecording] = useState([]);
    const recorderRef = useRef(null);
    const webcamRef = useRef(null);
    // for picture in picture mode of webcam
    const { isPictureInPictureActive, togglePictureInPicture } = usePictureInPicture(webcamRef);
    // accessing permission
    const getPermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                // accessing webcam
                const videoStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: { height: 240, width: 400 } });
                webcamRef.current.srcObject = videoStream;
                //accessing screen share
                const screenStream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
                let displaySurface = screenStream.getVideoTracks()[0].getSettings().displaySurface;
                if (displaySurface !== 'monitor') {
                    throw 'Selection of entire screen mandatory!';
                }else{
                    screenStream.getVideoTracks()[0].onended = function () {
                        setPermission(false);
                        setIsRecording(false);
                        togglePictureInPicture(false)
                        recorderRef.current?.stop();
                    };
                    const combinedStream=new MediaStream([...videoStream.getAudioTracks(),...screenStream.getVideoTracks()])
                    setStream(combinedStream)
                    setPermission(true);
                }
            } catch (err) {
                alert(`Sharing Error:${err}`)
            }
        } else {
            alert("Unable to access mediaRecorder")
        }
    }
    // start screen recording
    const startRecording = async () => {
        setIsRecording(true);
        togglePictureInPicture(!isPictureInPictureActive)
        try {
            const mediaRecorder = new MediaRecorder(stream, { type: "video/webm" });
            recorderRef.current = mediaRecorder;
            recorderRef.current.start();
            let xscreenrecording = [];
            recorderRef.current.ondataavailable = (event) => {
                if (typeof event.data === "undefined") return;
                if (event.data.size === 0) return;
                xscreenrecording.push(event.data)
            }
            setLocalRecording(xscreenrecording);
        } catch (err) {
            alert("Error while recording")
        }

    }
    // stop screen recording
    const stopRecording = async () => {
        setIsRecording(false);
        togglePictureInPicture(!isPictureInPictureActive)
        try {
            recorderRef.current.onstop = () => {
                const videoBulb = new Blob(localRecording, { type: "audio/webm" })
                const videoUrl = URL.createObjectURL(videoBulb);
                setScreenRecording(videoUrl);
                setLocalRecording([])
            }
            recorderRef.current.stop();
        } catch (err) {
            alert("Eroor in stop recording")
        }
    }
    return <>
        {!logged ?
            <Navigate to="/login"></Navigate> :
            <div className={styles.screen}>
                <div className={styles.webcam}>
                    <video ref={webcamRef} autoPlay muted poster="download.jfif"></video>
                </div>
                <div className={styles.button}>
                    {!permission ? <button onClick={getPermission}>Get Permissions</button> : null}
                    {permission && !isRecording ? <button onClick={startRecording}>Start Recording</button> : null}
                    {permission && isRecording ? <button onClick={stopRecording}>Stop Recording</button> : null}
                </div>
                <div className={styles.recording}>
                    {screenRecording && !isRecording ? <video src={screenRecording} height={240} width={600} autoPlay muted={false} controls></video> : null}
                    {screenRecording && !isRecording ? <a href={screenRecording} download>Download Screen Recording</a> : null}
                </div>
            </div>}
    </>
}
