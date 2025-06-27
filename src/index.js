// Base URL for the API
const BASE_URL = 'https://code-challenge-3-json-server.onrender.com';

// Main function that runs when the DOM is loaded
function main() {
    displayPosts();
    setupEventListeners();
}

// Display all food blog posts
function displayPosts() {
    fetch(`${BASE_URL}/posts`)
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById('post-list');
            
            if (posts.length === 0) {
                postList.innerHTML = '<p>No food posts found. Add your first recipe!</p>';
                return;
            }
            
            postList.innerHTML = '';
            posts.forEach(post => {
                const postItem = document.createElement('div');
                postItem.className = 'post-item';
                postItem.dataset.id = post.id;
                
                postItem.innerHTML = `
                    <h3>${post.title}</h3>
                    ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
                    <div class="post-meta">By ${post.author}</div>
                `;
                
                postItem.addEventListener('click', () => showPostDetails(post));
                postList.appendChild(postItem);
            });
            
            // Show details of the first post
            if (posts.length > 0) {
                showPostDetails(posts[0]);
            }
        })
        .catch(error => {
            document.getElementById('post-list').innerHTML = 
                `<p class="error">Error loading food posts: ${error.message}</p>`;
        });
}

// Show post details
function showPostDetails(post) {
    const postDetail = document.getElementById('post-detail');
    
    postDetail.innerHTML = `
        <div class="food-detail">
            <h2>${post.title}</h2>
            ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
            <div class="food-content">
                <p>${post.content}</p>
                <div class="post-meta">
                    <p><strong>Author:</strong> ${post.author}</p>
                    <p><strong>Category:</strong> ${post.category || 'General'}</p>
                </div>
            </div>
        </div>
    `;
}

// Create new post (frontend only)
function createNewPost(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;
    
    if (!title || !content || !author) {
        alert('Please fill in all fields');
        return;
    }
    
    // Create new post object
    const newPost = {
        title,
        content,
        author,
        // Generate a temporary ID
        id: Date.now()
    };
    
    // Add to the post list
    const postList = document.getElementById('post-list');
    const postItem = document.createElement('div');
    postItem.className = 'post-item';
    postItem.dataset.id = newPost.id;
    postItem.innerHTML = `
        <h3>${newPost.title}</h3>
        <div class="post-meta">By ${newPost.author}</div>
    `;
    postItem.addEventListener('click', () => showPostDetails(newPost));
    postList.appendChild(postItem);
    
    // Reset form
    document.getElementById('new-post-form').reset();
    
    // Show the new post details
    showPostDetails(newPost);
}

// Setup event listeners
function setupEventListeners() {
    // New post form
    document.getElementById('new-post-form').addEventListener('submit', createNewPost);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', main);