# idolodev Blog

Welcome to the idolodev Blog! This project is a personal blog built with Next.js, designed to share insights, tutorials, and updates on web development, tech career growth, and more. Stay updated with Treasure Uzoma’s Blog.

## Features

- **Dynamic Blog Posts**: Content powered by Velite and MDX, supporting rich text, code blocks, and images.
- **Category-based Filtering**: Easily browse blog posts by categories (tags).
- **Dark/Light Mode**: Seamless theme switching for an enhanced reading experience.
- **Post View Counter**: Track page views for each blog post using Firebase Firestore.
- **Responsive Design**: Optimized for various screen sizes, from mobile to desktop.
- **Table of Contents**: Automatically generated table of contents for easy navigation within long articles.
- **Contact Form**: A functional contact form for direct communication.
- **SEO Friendly**: Optimized for search engines with dynamic metadata and sitemap generation.
- **Lottie Animations**: Engaging animations for a modern UI/UX.

## Stacks / Technologies

| Technology            | Category            | Link                                                                                         |
| :-------------------- | :------------------ | :------------------------------------------------------------------------------------------- |
| **Next.js**           | Frontend Framework  | [https://nextjs.org/](https://nextjs.org/)                                                   |
| **React.js**          | JavaScript Library  | [https://react.dev/](https://react.dev/)                                                     |
| **Tailwind CSS**      | CSS Framework       | [https://tailwindcss.com/](https://tailwindcss.com/)                                         |
| **PostCSS**           | CSS Tool            | [https://postcss.org/](https://postcss.org/)                                                 |
| **Autoprefixer**      | CSS Tool            | [https://github.com/postcss/autoprefixer](https://github.com/postcss/autoprefixer)           |
| **Velite**            | Content Layer       | [https://velite.js.org/](https://velite.js.org/)                                             |
| **Firebase**          | Backend Services    | [https://firebase.google.com/](https://firebase.google.com/)                                 |
| **MDX**               | Markdown Extension  | [https://mdxjs.com/](https://mdxjs.com/)                                                     |
| **`date-fns`**        | Date Utility        | [https://date-fns.org/](https://date-fns.org/)                                               |
| **`numeral`**         | Number Formatting   | [http://numeraljs.com/](http://numeraljs.com/)                                               |
| **`react-hook-form`** | Form Management     | [https://react-hook-form.com/](https://react-hook-form.com/)                                 |
| **`github-slugger`**  | Slug Generation     | [https://www.npmjs.com/package/github-slugger](https://www.npmjs.com/package/github-slugger) |
| **DotLottieReact**    | Lottie Animations   | [https://lottiefiles.com/](https://lottiefiles.com/)                                         |
| **Next-Sitemap**      | Sitemap Generation  | [https://www.npmjs.com/package/next-sitemap](https://www.npmjs.com/package/next-sitemap)     |
| **Vercel**            | Deployment Platform | [https://vercel.com/](https://vercel.com/)                                                   |

## Installation

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/TreasureUzoma/Nextjs-Blog idolodev-blog
    cd idolodev-blog
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory based on `.env.example`. You'll need to obtain your Firebase configuration from the Firebase console.

    ```
    FIREBASE_API_KEY=your_firebase_api_key
    FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    FIREBASE_DATABASE_URL=your_firebase_database_url
    FIREBASE_PROJECT_ID=your_firebase_project_id
    FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    FIREBASE_APP_ID=your_firebase_app_id
    FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- **Browse Articles**: Navigate through blog posts from the homepage or by selecting specific categories.
- **Toggle Theme**: Use the moon/sun icon in the header to switch between dark and light modes.
- **Contact Me**: Fill out the contact form on the "Contact" page to send a message.
- **Search**: (Feature to be implemented)
- **Table of Contents**: On individual blog post pages, utilize the sticky table of contents for quick navigation.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

[![Readme was generated by Readmit](https://img.shields.io/badge/Readme%20was%20generated%20by-Readmit-brightred)](https://readmit.vercel.app)
