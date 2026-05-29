const btnREF=document.getElementById("img-btn");
const imgContREF=document.getElementById("image-container");
const zoomImgcont=document.getElementById("modal");
const zoomImg=document.getElementById("modal-image");
const nextBtn=document.getElementById("nextBtn");
const prevBtn=document.getElementById("prevBtn");

let photo=[];
let currentIndex=0;

btnREF.addEventListener("click",async ()=>{
    imgContREF.classList.add("enhance");
    const response =await fetch('https://api.pexels.com/v1/search?query=nature',{
        method:"GET"
    })
    const data =await response.json();
    
    //switching image
    photo=data.photos
    console.log(photo);//[{..},{...},{..},.....] array of objects("photos":[{}])

    data.photos.forEach((item,index)=>{ //for(const [index,item] of data.photos.entries()) /for(const item of data.photos)is similar to data.photos.forEach((item,index)=>{} => para2 in forEach shows index of current element and similary in for loop [index,item]
        let image=document.createElement("img");
        image.src=item.src.medium;//image.src=> <img src="">
        imgContREF.append(image);

        //item goes to each img : loop goes to image one by one ,but print all at ones present in object.
        image.addEventListener("dblclick",()=>{
            zoomImg.src=item.src.large;
            //here index gives particular image index position in an array
            console.log(index);//on clicking whatever image it gives their index (cause they are in array)
            currentIndex=index;
            zoomImgcont.classList.toggle("overlay");
        })
    })
    //debug this thing later...
    console.log("length =", photo.length);
});
nextBtn.addEventListener("click",()=>{
    currentIndex++;
    zoomImg.src=photo[currentIndex].src.large;
});
prevBtn.addEventListener("click",()=>{
    currentIndex--;
    zoomImg.src=photo[currentIndex].src.large;
});

window.addEventListener("click",(e)=>{
    if(e.target===zoomImgcont){
        zoomImgcont.classList.remove("overlay");
    }
});

/**one click one image
let currentIndex = 0;
let photos = [];
btnREF.addEventListener("click", async () => {
    if (photos.length === 0) {
        const response = await fetch("https://api.pexels.com/v1/search?query=nature");
        const data = await response.json();
        photos = data.photos;
    }
    const image = document.createElement("img");
    image.src = photos[currentIndex].src.small;
    imgContREF.append(image);
    currentIndex++;
    if (currentIndex >= photos.length) {
        currentIndex = 0;
    }
});
 */