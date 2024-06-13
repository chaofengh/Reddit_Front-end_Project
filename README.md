# Reddit Front-end Project

This is a Reddit front-end application built using React and Redux. The application allows users to browse Reddit posts, view post details, and read comments. It includes features such as image sliders for posts with multiple images and video playback for video posts.

## Features

- Browse Reddit posts
- View detailed information about each post
- Read comments and nested comments
- Display images with a slider for posts containing multiple images
- Play videos directly within the application

## Technologies Used

- React
- Redux
- React Router
- Swiper for image slider
- CSS for styling

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/chaofengh/Reddit_Front-end_Project.git
    ```

2. Navigate to the project directory:
    ```sh
    cd reddit_frontend_project
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and go to `http://localhost:3000` to view the application.

## Folder Structure

- `src/` - Main source directory
  - `features/` - Contains Redux slices and components for various features
    - `Posts/` - Components and slice for handling posts
      - `PostDetail.js` - Component for displaying post details and comments
      - `Post.js` - Component for displaying a single post
      - `Comments/` - Components for handling comments
        - `Comment.js` - Component for displaying a single comment
  - `utility/` - Contains utility components and functions
    - `ScrollContext.js` - Context for managing scroll position
    - `ImageSlider.js` - Component for displaying image sliders

## Component Descriptions

### PostDetail Component

The `PostDetail` component is responsible for displaying the detailed view of a single post, including any media (images or videos) and comments. It uses the `ImageSlider` component for displaying multiple images.

### Post Component

The `Post` component is responsible for displaying a summary of a single post, including the title, media thumbnail, and basic indicators like upvotes and comments.

### Comment Component

The `Comment` component is responsible for displaying a single comment. It can also recursively display nested comments. The component formats URLs within the comment text as clickable links.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m "Add some feature"
    ```
4. Push to the branch:
    ```sh
    git push origin feature/your-feature-name
    ```
5. Create a pull request.


## Acknowledgements

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Swiper](https://swiperjs.com/)
- [Reddit API](https://www.reddit.com/dev/api/)

## Contact

If you have any questions or suggestions, feel free to reach out to me at cfhuang001@gmail.com.
