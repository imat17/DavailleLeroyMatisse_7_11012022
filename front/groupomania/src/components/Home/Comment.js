import React from 'react';

const Comment = (props) => {
	// console.log(props)
	const commentsList = props.listComments;
	const idPost = props.postId;
	console.log(commentsList);
	console.log(idPost);

	return (
		<>
			{commentsList.forEach((comment) => {
				const displayComments = () => {
					if (idPost === comment.PostId) {
						return (
							<div className='comment__container' key={comment.id}>
								<div className='commenter__info'>
									<img src={comment.User.picture} alt='profile__pic' />
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
				};
				return <>{displayComments}</>;
			})}
		</>
	);
};

export default Comment;
