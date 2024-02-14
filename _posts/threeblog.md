---
date: '2024-01-01T12:50:54.000Z'
title: 'How to publish npm package and create dynamic svg loader '
tagline: Npm Package DynamicSvgLoader
preview: |2
   Vite project for our dynamic lazy SVG loader that can be used in both React and Vue. We'll follow similar steps as before:
image: >-
  https://images.unsplash.com/photo-1640017955477-75b58521007d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80
---
Vite project for our dynamic lazy SVG loader that can be used in both React and Vue. We'll follow similar steps as before:

1. **Create the Project**:
   Start by creating a new directory for your project. Navigate to that directory in your terminal and run the following commands:

   ```bash
   mkdir dynamic-svg-loader-vite
   cd dynamic-svg-loader-vite
   npm init -y
   ```

2. **Install Dependencies**:
   Install the necessary dependencies for your project:

   ```bash
   npm install react react-dom vue
   npm install --save-dev typescript vite vite-svg-loader
   ```

3. **Create the SVG Loader**:
   Let's create a TypeScript file that will handle dynamic SVG loading. Create a file named `DynamicSvgLoader.vue` in your project directory:

   ```vue
   <!-- DynamicSvgLoader.vue -->

   <template>
     <Suspense fallback="Loading...">
       <Icon :name="name" :size="size" :color="color" />
     </Suspense>
   </template>

   <script setup lang="ts">
   import { defineProps, Suspense, lazy } from 'vue';

   const { name, size = 16, color = '#000' } = defineProps({
     name: String,
     size: { type: Number, default: 16 },
     color: { type: String, default: '#000' },
   });

   const Icon = lazy(() => import(`./icons/${name}.svg?component`));
   </script>
   ```

4. **Create an Icons Directory**:
   Create a directory named `icons` in your project. Place your individual SVG files (e.g., `myicon.svg`, `anothericon.svg`) inside this directory.

My apologies for the oversight! Let's create the **React** implementation for our dynamic lazy SVG loader using **Vite**. We'll follow similar steps as before, but this time we'll focus on React:

1. **Install Dependencies**:
   Make sure you have already installed **Vite** and **React**. If not, run the following commands:

   ```bash
   npm install -g create-vite
   create-vite my-svg-loader-react --template react-ts
   cd my-svg-loader-react
   ```

2. **Install the Plugin**:
   Install the `@andylacko/vite-svg-react-loader` plugin:

   ```bash
   npm install --save-dev @andylacko/vite-svg-react-loader
   ```

3. **Configure Vite**:
   Open your `vite.config.ts` file and add the plugin to the list of Vite plugins:

   ```javascript
   // vite.config.ts
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import svgReactLoader from '@andylacko/vite-svg-react-loader';

   export default defineConfig({
     plugins: [react(), svgReactLoader()],
   });
   ```

4. **Create a Custom Hook**:
   Let's create a custom hook that dynamically imports SVG icons based on their names. Create a file named `useDynamicSvgImport.ts`:

   ```tsx
   // useDynamicSvgImport.ts
   import React, { useEffect, useRef, useState } from 'react';

   export function useDynamicSvgImport(iconName: string) {
     const importedIconRef = useRef<React.FC<React.SVGProps<SVGElement>>>();
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<unknown>();

     useEffect(() => {
       setLoading(true);

       const importSvgIcon = async (): Promise<void> => {
         try {
           importedIconRef.current = (
             await import(`../../assets/icons/${iconName}.svg`)
           ).ReactComponent; // svgr provides ReactComponent for given svg path
         } catch (err) {
           setError(err);
           console.error(err);
         } finally {
           setLoading(false);
         }
       };

       importSvgIcon();
     }, [iconName]);

     return { error, loading, SvgIcon: importedIconRef.current };
   }
   ```

5. **Create the SVG Icon Wrapper Component**:
   Now let's create a wrapper component that handles loading and rendering the SVG icon. Create a file named `SvgIcon.tsx`:

   ```tsx
   // SvgIcon.tsx
   import React from 'react';
   import { useDynamicSvgImport } from './useDynamicSvgImport';

   interface SvgIconProps {
     iconName: string;
     wrapperStyle?: React.CSSProperties;
     svgProp?: React.SVGProps<SVGSVGElement>;
   }

   function SvgIcon({ iconName, wrapperStyle, svgProp }: SvgIconProps) {
     const { loading, SvgIcon } = useDynamicSvgImport(iconName);

     return (
       <>
         {loading && (
           <div className="rounded-full bg-slate-400 animate-pulse h-8 w-8"></div>
         )}
         {SvgIcon && (
           <div style={wrapperStyle}>
             <SvgIcon {...svgProp} />
           </div>
         )}
       </>
     );
   }

   export default SvgIcon;
   ```

6. **Usage**:
   In your React components, you can now use the `SvgIcon` component like this:

   ```tsx
   // Example usage
   import React from 'react';
   import SvgIcon from './SvgIcon';

   const MyComponent: React.FC = () => {
     return (
       <div>
         <SvgIcon iconName="myicon" wrapperStyle={{ color: 'red' }} />
       </div>
     );
   };

   export default MyComponent;
   ```

   ```jsx
   // React
   import React from 'react';
   import DynamicSvgLoader from './DynamicSvgLoader.vue';

   const MyComponent = () => {
     return (
       <div>
         <DynamicSvgLoader name="myicon" size={24} color="#ff0000" />
       </div>
     );
   };

   export default MyComponent;
   ```

   ```vue
   <!-- Vue -->
   <template>
     <div>
       <DynamicSvgLoader name="myicon" :size="24" color="#ff0000" />
     </div>
   </template>

   <script setup>
   import DynamicSvgLoader from './DynamicSvgLoader.vue';
   </script>
   ```

7. **Build and Serve**:
   Build your project using Vite:

   ```bash
   npx vite build
   ```

   Serve your project locally:

   ```bash
   npx vite
   ```

Remember to adjust the configuration and folder structure according to your specific needs. Enjoy building your dynamic SVG loader with Vite! 🚀🎨

Source: Conversation with Bing, 2/14/2024
(1) vite-svg-loader - npm. https://www.npmjs.com/package/vite-svg-loader.
(2) react-svg-loader - npm. https://www.npmjs.com/package/react-svg-loader.
(3) vue-svg-loader - npm. https://www.npmjs.com/package/vue-svg-loader.
(4) Dynamic inline importing raw SVG in Vue.js & Vite. https://stackoverflow.com/questions/71176408/dynamic-inline-importing-raw-svg-in-vue-js-vite.
