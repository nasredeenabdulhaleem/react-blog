

function createBlog() {
  

  return (
    <>
      <form action="" method="post">
        <div className="form-group">
          <input type="text" name="title" id="title" />
          </div>
          <div className="form-group">
          <input type="text" name="slug" id="slug" />
          </div>
          <div className="form-group">
          <label htmlFor="body"> Body</label>
          <textarea name="body" id="body" cols="30" rows="10"></textarea>
          </div>
          <div className="form-group">
          <label htmlFor="body"> tags</label>
          <input type="" name="" id="" />
        </div>
      </form>
    </>
  );
}
