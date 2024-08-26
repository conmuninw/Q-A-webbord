document.onload;
console.log('hellow world');
if (window.location.href !== 'http://localhost:5500/vive/questionVive_Id.html') {
    localStorage.removeItem('postId');
}
function toHomepage() {
    window.location.href = 'index.html';
}

// questionVive_Id.html file 
if (window.location.href === 'http://localhost:5500/vive/questionVive_Id.html') {
        // เปิด dropdown เพื่อพิมพ์คำตอบ
    function btn_open() {
        document.querySelector('.comment-windown').style.display = 'block';
    }
        // ปิด dropdown
    function btn_close() {
        document.querySelector('.comment-windown').style.display = 'none';
    }
    // แสดงข้อมูลตาม id
    const postId = localStorage.getItem('postId');
    axios.get(`http://localhost:3000/post/${postId}`)
    .then(res => {
        // แปลงวันที่
        const isoDate = res.data.resultPost.create_at;
        const date = new Date(isoDate);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const readableDate = date.toLocaleDateString('th-TH', options);
        // แสดงข้อมูล
        document.querySelector('.question').innerHTML = res.data.resultPost.question;
        document.querySelector('.question-detail').innerHTML = res.data.resultPost.detail;
        document.querySelector('.questioner-name').innerHTML = res.data.resultPost.questioner;
        document.querySelector('.questioner-date').innerHTML = readableDate;
        document.querySelector('.answer').innerHTML = '';
        console.log(res.data.resultPost.image_file);
        if (res.data.resultPost.image_file === undefined) {
            document.querySelector('.img').innerHTML = '';
        } else {
            let img = document.createElement('img');
            img.src = `http://localhost:3000/img/${res.data.resultPost.image_file}`;
            document.querySelector('.img').appendChild(img);
        }
        res.data.resultComent.forEach(item => {
            // แปลงวันที่
            const isoDate = item.create_at;
            const date = new Date(isoDate);
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            const readableDate = date.toLocaleDateString('th-TH', options);
            document.querySelector('.viveId-body').insertAdjacentHTML('beforeend', `
                <div class="answer">
                    <div class="answer-box">
                        <p>${item.answer}</p>
                        <div class="answerer">
                            <p>${item.answerer}</p>
                            <p>${readableDate}</p>
                        </div>
                    </div>
                </div>
            `);
        });
    })
    .catch(err => console.error(err));
    // สร้างคำตอบสำหรับคำถาม
    function create_coment() {
        axios.post('http://localhost:3000/comment', {
            question_id: postId,
            answer: document.querySelector('.answer-detail').value,
            answerer: document.querySelector('.answerer-name').value
        })
        .then(res => {
            if (res.data.status === 200) {
                window.location.reload();
                return;
            };
        })
        .catch(err => console.error(err))
    }
}

// index.html file
if (window.location.href === 'http://localhost:5500/vive/index.html') {
    axios.get('http://localhost:3000/post')
    .then(res => {
        document.querySelector('.body-post').innerHTML = '';
        res.data.result.forEach(item => {
            // แปลงวันที่
            const isoDate = item.create_at;
            const date = new Date(isoDate);
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            const readableDate = date.toLocaleDateString('th-TH', options);
            // แสดงข้อมูล
            document.querySelector('.webbords-body').insertAdjacentHTML('beforeend', `
                <div class="body-post">
                    <p name="ddmmyy" id="ddmmyy" class="p-1">${readableDate}</p>
                    <a name="detail" id="${item._id}" class="p-2" href="questionVive_Id.html" onclick="getPostId(event)">${item.question}</a>
                    <p name="name" id="name" class="p-3">${item.questioner}</p>
                    <p name="count" id="count" class="p-4">${item.num_answers}</p>
                </div>
            `);      
        });
    })
    .catch(err => console.error(err));
    function getPostId(event) {
        localStorage.setItem('postId', event.target.id);
    }
}

// questionPost.html file
if (window.location.href === 'http://localhost:5500/vive/question_post.html') {
    function create_post() {
        //  สร้าง form-data เพื่ออัพโหลดรูป
        const formData = new FormData();
        formData.append('image_file', document.querySelector('.image-file').files[0]);
        formData.append('question', document.querySelector('.question').value);
        formData.append('detail', document.querySelector('.question-detail').value);
        formData.append('questioner', document.querySelector('.questioner-name').value);
        // สร้างโพสต์
        axios.post('http://localhost:3000/post', formData)
        .then(res => {
            if (res.data.status === 200) {
                window.location.href = 'index.html';
                return;
            };
        })
        .catch(err => console.error(err))
    }
}