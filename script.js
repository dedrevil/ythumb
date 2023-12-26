document.addEventListener('DOMContentLoaded', function () {
    gsap.to('body', { opacity: 1, duration: 0.25 }); // Use GSAP for opacity animation
});

var imgUrl;

function getThumbnails() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoId = extractVideoId(videoUrl);

    if (videoId) {
        const thumbnailsContainer = document.getElementById('thumbnails');
        thumbnailsContainer.innerHTML = '';

        const sizes = ['default', 'medium', 'high', 'maxres'];
        //sizes.forEach(size => {
        //    const imageUrl = `https://img.youtube.com/vi/${videoId}/${size}default.jpg`;
        const imageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = `Thumbnail Maxres`;
        thumbnailsContainer.appendChild(imgElement);
        //});

        //const dlbutton = document.getElementById('download-button');
        //const clbutton = document.getElementById('clear-button');
        //dlbutton.style.display='visible';
        //clbutton.style.display='visible';

        showDownloadButton(videoId);
        imgUrl = imageUrl;
    } else {
        alert('Invalid YouTube Video URL');
    }
}

function showDownloadButton(videoId) {
    const downloadButton = document.getElementById('download-button');
    downloadButton.setAttribute('href', `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
    downloadButton.style.display = 'block';
    const clearButton = document.getElementById('clear-button');
    clearButton.style.display = 'block';
}

function downloadImg() {
    alert(imgUrl);
    window.open(imgUrl);
}


function clean() {
    alert("calling reload")
    window.location.reload();
}

async function downloadImage(
    imageSrc, videoId,
    nameOfDownload = videoId + '-thumbnail.jpg',
) {
    const response = await fetch(imageSrc);

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement('a');
    anchorElement.href = href;
    anchorElement.download = nameOfDownload;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
}

function extractVideoId(url) {
    var token;
    if (url.indexOf("?v=") > -1) {
        token = url.split("?v=")[1];
    } else {
        if (url.indexOf("?si=") > -1) {
            url = url.split("?si=")[0];
            token = url.split("/").pop();
        } else
            token = url.split("/").pop();
    }
    alert(token);
    return token;
}

function openPrivacyPolicy() {
    const privacyPolicyPopup = document.getElementById('privacy-policy');
    privacyPolicyPopup.style.display = 'block';
}

function closePrivacyPolicy() {
    const privacyPolicyPopup = document.getElementById('privacy-policy');
    privacyPolicyPopup.style.display = 'none';
}

