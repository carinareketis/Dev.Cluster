toggleShareButton();

function toggleShareButton() {
  $('#addPost').on('keyup', function () {
      const str = $('#addPost').val();
      if (str.length > 0) {
          $('#sendPost').removeAttr('disabled');
      }
      else {
          $('#sendPost').prop('disabled', true);
      }
  });
}

function showPost(guide, name) {
  let html = "";
  guide.map((element, index) => {
    let message = element.msg;
    let like = element.like;

    const post = `<blockquote class="blockquote card card-coin card-plain">
				<div class="form-group ">
					<button name=delete${index} class="btn btn-fab btn-icon btn-round" data-toggle="modal" data-target="#exampleModalDelete">
						<i class="tim-icons icon-trash-simple"></i>
					</button>
					<button name=edit${index} class="btn btn-fab btn-icon btn-round" data-toggle="modal" data-target="#exampleModalEdit">
						<i class="tim-icons icon-pencil"></i>
					</button>
				</div>
				<div class="form-group">
					<p class="mb-0">${message}</p>
				</div>
				<div class="form-group">
					<button rel="tooltip" title="Em construção" data-placement="bottom" class="btn btn-primary btn-fab btn-icon btn-round">
						<i class="tim-icons icon-chat-33"></i>
					</button>
					<button name=like${index} class="btn btn-primary btn-fab btn-icon btn-round">
						<i class="tim-icons icon-heart-2"></i>
					</button>
					<span id="like">${like}</span>
				</div>
			</blockquote>	
          `
    html += post
  })

  return html;
}

const verifyUser = (info, userId, data) => {
  if (info === userId) {
    let guide = data;
    showUserMsg(data);
    creatPost(data, userId);
    deletePost(data, userId);
    like(data.message, userId);
    editPost(data.message, userId);
  };
};

const showUserMsg = (data) => {
  console.log(data)
  const name = data.name;
  const post = data.message;
  $("#post").prepend(showPost(post, name));
}

const creatPost = (post, user) => {
  $("#sendPost").click(() => {
    const name = post.name;
    const newPost = [{ msg: $("#addPost").val(), like: 0 }];
    const message = post.message;
    let newArr = [...newPost, ...message];
    $("#post").prepend(showPost(newPost, name));
    db.collection("user").doc(user).update({
      message: newArr
    });
    setTimeout(() => {
      window.location.reload(1);
    }, 1000);
  });
};

const deletePost = (post, user) => {
  const arr = post.message;
  arr.map((e, index) => {
    $(`button[name=delete${index}]`).click((e) => {
      const i = index;
      $("#btn-delete").click((e, i) => {
        $('.modal').modal('hide');
        arr.splice(i, 1);
        const newArr = [...arr];
        $(`button[name=delete${index}]`).parent().parent().remove();
        e.preventDefault();
        db.collection("user").doc(user).update({
          message: newArr
        });
        setTimeout(() => {
          window.location.reload(1);
        }, 1000);
      });
    });
  });
};

const like = (post, user) => {
  const arr = post;
  arr.map((element, index) => {
    let likeAccountant = element.like;
    $(`button[name=like${index}]`).click(() => {
    // e.preventDefault();
      likeAccountant++
      arr[index].like = likeAccountant;
      db.collection("user").doc(user).update({
        message: arr
      });
      setTimeout(() => {
        window.location.reload(1);
      }, 1000);
    });
  });
};

const editPost = (post, user) => {
  const arr = post;
  arr.map((e, index) => {
    $(`button[name=edit${index}]`).click((e) => {
      // e.preventDefault();
      $("#edit-post").val(arr[index].msg);
      $("#btn-edit").click((e, i) => {
        e.preventDefault();
        arr[index].msg = $("#edit-post").val();
        $('.modal').modal('hide');
        db.collection("user").doc(user).update({
          message: arr
        });
        setTimeout(() => {
          window.location.reload(1);
        }, 1000);
      });
    });
  });
};

const takeUserCollection = (user, userId) => {
  db.collection("user").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const docId = doc.id;
      const userData = doc.data();
      const userLoggedIn = user.uid;
      verifyUser(docId, userLoggedIn, userData);
    });
  });
};