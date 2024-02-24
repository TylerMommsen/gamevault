# GameVault
GameVault is a Game Catalog site which is the ultimate destination for exploring a vast collection of over 800,000 games. All data is fetched using RAWG API to provide comprehensive information, including descriptions, ratings, metacritic scores, publishers, developers and much more! 

## Demo
[Live](https://tylermommsen-gamevault.vercel.app/)

## Built With
<table align="start">
  <tr>
    <td align="center" height="70" width="70">
      <img src="https://skillicons.dev/icons?i=nextjs" alt="Next.js icon">
      <br/>Next.js
    </td>
    <td align="center" height="70" width="70">
      <img src="https://skillicons.dev/icons?i=react" alt="React icon">
      <br/>React
    </td>
    <td align="center" height="70" width="70">
      <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript icon">
      <br/>TypeScript
    </td>
    <td align="center" height="70" width="70">
      <img src="https://skillicons.dev/icons?i=tailwind" alt="Tailwind icon">
      <br/>TailWind
    </td>
  </tr>
</table>

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
