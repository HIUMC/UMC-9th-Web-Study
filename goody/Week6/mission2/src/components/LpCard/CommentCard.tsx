interface CommentsProps {
    id : number;
    content : string;
    author : {
        name: string;
    };
}

const CommentCard = ({id,content,author}:CommentsProps) => {
    return (
        <div className="flex flex-col w-full gap-6 mt-6 border-4 border-black mr-10">
            <div key={id} className="flex items-start gap-3">
                {/* 프로필 이미지 (임시) */}
                <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0">
                {/* <img src={comment.author.profileImage} /> */}
                </div>
                {/* 이름 + 댓글 내용 */}
                <div>
                    <span className="text-sm font-bold text-white block mb-1">
                        {author.name} 
                    </span>
                    <p className="text-sm text-gray-300">{content}</p>
                </div>
            </div>
                
        </div>
        
    )
}

export default CommentCard
