import React from 'react';

const Comment = (props) => {
	const commentsList = props.listComments;
	const idPost = props.postId;

	const displayComments = () => {
		commentsList.map((comment) => {
			if (idPost === comment.PostId) {
				return (
					<div className='comment__container'>
						<div className='commenter__info'>
							<img src={comment.User.picture} className="profile__pic" alt='profile pic' />
							<p className='commenter__pseudo'>{comment.commenterPseudo}</p>
						</div>
						<div className='comment__data'>
							<p className='comment__text'>{comment.text}</p>
						</div>
					</div>
				);
			} else {
				return null;
			}
		});
	};

	return <>{displayComments()}</>;
};

export default Comment;
