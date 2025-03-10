<template>
    <div>
        <!-- <h3 class="comments-bubble">Comments</h3> -->
        <div v-if="comments.length === 0">No comments yet</div>
        <ul class="comments-list">
            <li class="comments" v-for="comment in comments" :key="comment.commentId">
                <div class="comment-content">
                    <div class="comment-header">
                        <strong>&nbsp;&nbsp;{{ comment.username }} replied: </strong>
                        <small class="comment-date">on: {{ formattedDate(comment.createdDate) }}</small>
                    </div>
                    <div v-if="isEditingComment && editingCommentId === comment.commentId">
                        <input v-model="updatedCommentContent" placeholder="Edit your comment" class="comment-input" />
                        <div class="button-container">
                            <button class="button is-info" @click="saveComment(comment.commentId)">Save</button>
                            <button class="button is-warning" @click="cancelEdit">Cancel</button>
                        </div>
                    </div>
                    <div v-else>
                        <div class="comment-text"> {{ comment.commentContent }} </div>
                        <div class="button-container">
                            <button class="button is-success" @click="editComment(comment)">Edit</button>
                            <button class="button is-warning" @click="deleteComment(comment.commentId)">Delete</button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import ForumService from '../services/ForumService';

export default {
    name: 'CommentsList',
    props: {
        comments: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            isEditingComment: false,
            editingCommentId: null,
            updatedCommentContent: ''
        }
    },
    methods: {
        editComment(comment) {
            console.log('Editing comment:', comment);
            this.isEditingComment = true;
            this.editingCommentId = comment.commentId;
            this.updatedCommentContent = comment.commentContent;
        },
        cancelEdit() {
            this.isEditingComment = false;
            this.editingCommentId = null;
            this.updatedCommentContent = '';
        },
        async saveComment(commentId) {
            const commentToUpdate = this.comments.find(comment => comment.commentId === commentId);

            if (!commentToUpdate) {
                console.error('Comment not found!');
                return;
            }

            const updatedComment = {
                commentId: commentId,
                forumId: commentToUpdate.forumId,
                customerId: commentToUpdate.customerId,
                commentContent: this.updatedCommentContent,
            };
            
            try {
                await ForumService.updateComment(commentId, updatedComment);
                this.$emit('comment-updated', updatedComment);
                this.cancelEdit();
            } catch (error) {
                console.error('Error updating comment', error);
            }
        },
        async deleteComment(commentId) {
            const confirmDelete = confirm('Are you sure you want to delete this comment?');
            if (confirmDelete) {
                try {
                    await ForumService.deleteComment(commentId);
                    this.$emit('comment-deleted', commentId);
                } catch (error) {
                    console.error('Error deleting comment', error);
                }
            }
        },
        formattedDate(dateString) {
            console.log('Original Date String:', dateString);
            if (!dateString) return 'Invalid date';

            try {
                // Create a date object using the date string
                const date = new Date(dateString);

                // Check if the date is valid
                if (isNaN(date.getTime())) {
                    throw new Error('Invalid date');
                }

                // Log the parsed date
                console.log('Parsed Date:', date);

                // Format the date to the desired locale and time zone
                return date.toLocaleString('en-US', { timeZone: 'America/New_York' });
            } catch (error) {
                console.error('Date parsing error:', error);
                return 'Invalid date';
            }
        }
    }
}
</script>

<style scoped>
.comments-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.comments {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
}

/* .comments-bubble {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
} */

li {
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 10px 15px;
    margin: 10px 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    align-self: center;
    display: flex;
    flex-direction: column;
    width: 95%;
}

strong {
    margin-right: 5px;
    width: auto;
    flex-shrink: 0;
    white-space: nowrap;
}

.comment-text {
    flex-grow: 1;
    word-wrap: break-word;
    padding-left: 10px;
    padding-right: 10px;
    line-height: 1.5;
    white-space: pre-wrap;
    margin-left: 5px;
}

.button-container {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    margin: 7px;
}

.comment-input {
    width: 100%;
    height: 40px;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    
}

.comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.comment-date {
    margin-left: auto;
    font-size: 0.9rem;
    color: #666;
    padding-right: 10px;
}

</style>