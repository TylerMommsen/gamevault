# GameVault
GameVault is a Game Catalog site which is the ultimate destination for exploring a vast collection of over 500,000 games. All data is fetched using RAWG API to provide comprehensive information, including descriptions, ratings, metacritic scores, publishers, developers and much more! Built using Next.js/React, TypeScript and Tailwind.

## Demo
[Live](https://tylermommsen-gamevault.vercel.app/)

## Built With
<div>
  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js icon">
  </br>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react icon">
  </br>
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript icon">
  </br>
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="tailwind icon">
  </br>
</div>

## Features
- Vast catalog of over 800,000 games.
- Filter by platform or sort by release date, name, popularity and average rating.
- Filter games by genre.
- Search for any game you want.
- View detailed game information, screenshots and trailers.
- Add games to personal collection or to wishlist.
- Responsive design.

## Screenshots
![GameVault Catalog Page](https://github.com/TylerMommsen/gamevault/assets/65496518/61801b9a-72ad-4ca8-824e-ff76521e3b07)
![GameVault Details Page](https://github.com/TylerMommsen/gamevault/assets/65496518/2b1e3b95-3829-4955-928f-8ffc150a03cd)

## Development
Follow these steps to run the project locally.
1. Clone the repository.
  HTTPS
  ```sh
  git clone https://github.com/TylerMommsen/gamevault.git
  ```
  SSH
  ```sh
  git clone git@github.com:TylerMommsen/gamevault.git
  ```

2. Install dependenices
  ```sh
  npm install
  ```

3. Get Your Free API Key at [RAWG API](https://rawg.io/apidocs)

4. Create a <code>.env.local</code> file in the root directory.

5. Add: <code>NEXT_PUBLIC_RAWG_API_KEY=YOUR_API_KEY</code> and make sure to replace <code>YOUR_API_KEY</code> with your own key.

6. Run the project
  ```sh
  npm run dev
  ```
