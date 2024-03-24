function CommentForm() {
  return (
    <form>
      <div className="py-2 xs:py-6">
        <textarea
          placeholder="Add a comment"
          className="text-md w-full text-white rounded-xl
                    bg-transparent border p-4 border-dark-600 placeholder-white
                    placeholder-opacity-50 resize-none"
        />
      </div>
    </form>
  );
}

export default CommentForm;
