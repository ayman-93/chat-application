const createUserElement = (userSocketId, userName, id) => {
    const anchor = document.createElement("a");
    anchor.addEventListener('click', (e) => {
        console.log('userName', userName);
        localStorage.setItem('receiver', JSON.stringify({ socketId: userSocketId, id, name: userName }))
        window.location.assign('../privateChat.html')
    })
    anchor.id = userSocketId;
    anchor.className = "list-group-item list-group-item-action bg-dark text-white rounded-0";

    const div1 = document.createElement("div");
    div1.className = "media";

    const img = document.createElement("img");
    img.className = "rounded-circle";
    img.src = "../img/avatar_placeholder.jpg";
    img.width = 50;
    div1.append(img);

    const div2 = document.createElement("div");
    div2.className = "media-body ml-4";

    const div3 = document.createElement("div");
    div3.className = "d-flex align-items-center justify-content-between mb-1";

    const h6 = document.createElement("h6");
    h6.className = "mb-0";
    h6.innerText = userName;
    div3.append(h6);
    div2.append(div3);
    div1.append(div2);
    anchor.append(div1);

    return anchor;
    {/* <a class="list-group-item list-group-item-action bg-dark text-white rounded-0">
    <div1 class="media">
        <img src="./img/avatar_placeholder.jpg" alt="user" width="50" class="rounded-circle">
        <div2 class="media-body ml-4">
            <div3 class="d-flex align-items-center justify-content-between mb-1">
                <h6 class="mb-0">Jason Doe</h6>
            </div3>

        </div2>
    </div1>
</a> */}
}

const createMessageElement = (sender, message, isRight) => {

    const div1 = document.createElement('div');
    div1.className = "media w-50 mb-3";
    if (isRight) {
        div1.className += " ml-auto";
    }

    const div2 = document.createElement('div');
    div2.className = "media-body";
    if (!isRight) {
        div2.className += " ml-3";
    }

    const div3 = document.createElement('div');
    div3.className = "bg-light rounded py-2 px-3 mb-2";

    const p = document.createElement('p');
    p.className = "text-small mb-0 text-muted";
    p.innerHTML = `<b>${sender}: </b>${message}`;
    div3.appendChild(p);
    div2.appendChild(div3);
    div1.appendChild(div2);
    return div1;

    //  <!-- Sender Message-->
    //  <div1 class="media w-50 mb-3">
    //      <div2 class="media-body ml-3">
    //          <div3 class="bg-light rounded py-2 px-3 mb-2">
    //              <p class="text-small mb-0 text-muted">Test which is a new approach all solutions</p>
    //          </div>
    //      </div>
    //  </div>

    //  <!-- Reciever Message-->
    //  <div1 class="media w-50 ml-auto mb-3">
    //      <div2 class="media-body">
    //          <div3 class="bg-light rounded py-2 px-3 mb-2">
    //              <p class="text-small mb-0 text-muted">Test which is a new approach to have all solutions
    //              </p>
    //          </div>
    //      </div>
    //  </div>
}



