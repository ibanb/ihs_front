import React, {useState, useRef, useEffect} from 'react';
import './recognize.css';
import axios from 'axios';
// import Input from "../../utils/input/Input";


const Recognition = () => {

    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasFoto, setHasFoto] = useState(false)

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: 1920, height: 1080}})
            .then(stream => {
                let video = videoRef.current
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        getVideo()
    }, [videoRef])

    let imgs = [];

    const takeFoto = () => {
        const width = 570;
        const height = width / (16/9);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        setHasFoto(true);
    }

    const closeFoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.clearRect(0,0, photo.width, photo.height);

        setHasFoto(false)

    }

    const sendFoto = async () => {


       
        const width = 570;
        const height = width / (16/9);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        
        const canvas = document.querySelector('.canvas');

        const formData = new FormData();
        
        const dataURL = canvas.toDataURL("image/jpg", 1.0);
        dataURL.replace(/^data:image\/?[A-z]*;base64,/);
        formData.append('image', dataURL);
        // console.log(dataURL)
        
        
        const response = await axios.post(`http://localhost:5000/api/files/selfy`, formData, {
                headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjU5M2M1N2U5NTY0M2ZmYzBjZTU3MiIsImlhdCI6MTY5Njk2MjQxMCwiZXhwIjoxNjk2OTk4NDEwfQ.Z5s1MAygtg2zjW1etiVqv3MrJRc2CTfbEPo-gWBcfRs`},
        })

        
        console.log(response.data.message)
        // TAKE from back
        // console.log(response.data.buffer.data)
        // const buf = response.data.buffer.data
        // const bytes = new Uint8Array(buf);
        // const blob = new Blob([bytes.buffer]);
        // const image = document.querySelector('.img')
        // const reader = new FileReader();

        // reader.addEventListener('load', (e) => {
        //     image.src = e.target.result;
        //     // this.$el.append(image);
        // });
    
        // reader.readAsDataURL(blob);

       
    }
    
    return (
        <div className='recognition'>
            <div className="camera">
                <video ref={videoRef}></video>
                <button className='recognize__button_snap' onClick={takeFoto}>СНЯТЬ</button>
            </div>
            <div className={'result ' + (hasFoto ? 'hasFoto' : '')}>
                <canvas className='canvas' ref={photoRef}></canvas>
                <button className='recognize__button_snap send' onClick={() => sendFoto()}>ОТПРАВИТЬ</button>
            </div>
            {/* <div className='rec-images'>
                <img className='img' alt="alt"></img>
            </div> */}
        </div>
    );
};

export default Recognition;