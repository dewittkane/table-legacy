let startingGame = {
    name: "Catan",
    description_preview: " The women and men of your expedition build the first two settlements. Fortunately, the land is rich in natural resources. You build roads and new settlements that eventually become cities. Will you succeed in gaining supremacy on Catan? Barter trade dominates the scene. Some resources you have in abundance, other resources are scarce. Ore for wool, brick for lumber - you trade according to what is needed for your current building projects. Proceed strategically! If you found your settlements in the right places and skillfully trade your resources, then the odds will be in your favor. But your opponents are smart too. \r\n\r\n To begin the game, we build the game board using hexagonal terrain tiles. Catan is born - a beautiful island with mountains, pastures, hills, fields, and forests, surrounded by the sea. \r\n\r\n Each of us places two small houses on spaces where three terrain hexes meet. They are our starting settlements. \r\n\r\n And so it begins. I roll two dice. An “11”! Each terrain hex is marked with a die roll number. Each player who owns a settlement adjacent to a terrain hex marked with the number rolled receives a resource produced by this hex. Hills produce brick, forests produce lumber, mountains produce ore, fields produce grain, and pastures produce wool. \r\n\r\n We use these resources to expand across Catan: we build roads and new settlements, or we upgrade our existing settlements to cities. For example, a road costs 1 brick and 1 lumber. If we do not have the necessary resources, we can acquire them by trading with our opponents. \r\n\r\n Each settlement is worth 1 victory point and each city is worth 2 victory points. If you expand cleverly, you may be the first player to reach 10 victory points and thus win the game! ",
    images: {
        thumb: "https://d2k4q26owzy373.cloudfront.net/40x40/games/uploaded/1559258096678-51Eiofu9mqL.jpg",
        small: "https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1559258096678-51Eiofu9mqL.jpg",
        medium: "https://d2k4q26owzy373.cloudfront.net/350x350/games/uploaded/1559258096678-51Eiofu9mqL.jpg",
        large: "https://d2k4q26owzy373.cloudfront.net/700x700/games/uploaded/1559258096678-51Eiofu9mqL.jpg",
        original: "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559258096678-51Eiofu9mqL.jpg"
    },
    url: "https://www.boardgameatlas.com/search/game/OIXt3DmJU0/catan",

}

const selectedGameReducer = (state = startingGame, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  
  // search will be on the redux state at:
  // state.search
  export default selectedGameReducer;