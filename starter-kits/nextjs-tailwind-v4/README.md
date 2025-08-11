# Subframe Next.js v15 & Tailwind CSS v4 Starter Kit

This is a starter kit for [Subframe](https://subframe.com) for Next.js, configured to work with **Tailwind CSS v4**. The instructions below will guide you through the correct configuration and synchronization process.

The setup process for Tailwind CSS v4 differs from the standard instructions. Follow the steps below to avoid issues.

### 1. Install Dependencies

Install all required dependencies using `pnpm` (recommended) or `npm`.

```bash
pnpm install
```

### 2. Synchronize with Subframe

The standard `subframe init` command may be outdated. To properly synchronize your project with Subframe using Tailwind CSS v4, run the following command in your terminal:

```bash
pnpx @subframe/cli@latest init -p $PROJECT_ID --css-type tailwind-v4
```

**Note:** Replace `$PROJECT_ID` with your actual project ID, which you can find in the Subframe panel.

### 3. Final Style Configuration

After synchronizing the project, a couple of final steps are necessary to apply your Subframe styles.

#### a) Populate the `theme.css` File

The sync command will create a `ui/` directory. You now need to add your theme styles:

1.  Create a file if it doesn't exist: `ui/theme.css`.
2.  Copy the CSS content for your theme directly from the Subframe panel, available here: [**Subframe Theme CSS for Tailwind v4**](https://app.subframe.com/library?component=theme&showThemeModalCSSType=tailwindV4).
3.  Paste the content into your local `ui/theme.css` file.

#### b) Uncomment the Theme Import in `globals.css`

Open your main app stylesheet, `app/globals.css`. The import for the Subframe theme is already present but commented out. Simply uncomment it to apply your styles.

```css
/* app/globals.css */

@import "../ui/theme.css"; /* <-- Make sure this line is uncommented */
@import "tailwindcss";

/* ... the rest of your styles ... */
```

### 4. Add Your page code from Subframe

With the project synced and styles configured, you can now add your page code.

1.  Go to your project in the [Subframe web application](https://app.subframe.com).
2.  Navigate to the page or component you want to use.
3.  Copy the React/TypeScript code for it.
4.  Paste the code directly into your `src/app/page.tsx` file, replacing its contents.

### 5. Adding More Pages (Subpages)

This project uses the Next.js App Router, which has a file-system-based routing mechanism. To add more pages:

1.  **Create a new folder** inside the `src/app/` directory. The name of the folder will be the URL path.
    *   For example, to create a page at `/about`, you would create a folder: `src/app/about/`.
    *   For a nested route like `/dashboard/settings`, you would create the folders: `src/app/dashboard/settings/`.

2.  **Create a `page.tsx` file** inside the new folder. This file will be the UI for that route.

3.  **Add your content.** Copy the JSX code for the new page from Subframe and paste it into the new `page.tsx` file.

Example structure for an `/about` page:

```
src/
└── app/
    ├── about/
    │   └── page.tsx  // Content for the /about page
    └── page.tsx      // Content for the home page (/)
```

### 6. Run the Project

After completing all the above steps, you can start the development server to see your project live.

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your design. You can also navigate to the new pages you created (e.g., [http://localhost:3000/about](http://localhost:3000/about)).

## Key Notes on Tailwind CSS v4

-   **No configuration file:** Unlike previous versions, Tailwind CSS v4 in this setup does not require `tailwind.config.js` file.
-   **Correct `init` command:** Always ensure you use the `--css-type tailwind-v4` flag during synchronization to avoid compatibility issues.

## Learn More

To learn more about Subframe, check out the [Subframe documentation](https://docs.subframe.com).
