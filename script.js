
const search = document.querySelector("#searchInput");
const containerSuggestion = document.querySelector(".suggestions-container")


window.addEventListener("load", createFetch)

async function createFetch() {
	const response = await fetch("./list.json");
	console.log(response);
	const data = await response.json();
	console.log(data);


	
	const fuse = new Fuse(data, {keys : ['title'], includeScore: true});
	console.log(fuse);
	//On instancie un nouvelle objet avec deux parametres : notre fichier à regarder et l object d' utilitaire de fuse.

	// data le fichier où regarder

	// {vide} c'est l objet utilitaire de fuse, de base il contient deja des utilitaires, ect... on peut en rajouter d' autres selon nos besoins , pour savoir regarder sur le site. Ici j ai ajouter includeScore: true, il permet de voir le score de match du mot rechercher et les mot dans le .json.

	//On y ajoute keys(=propriétées) : ["le nom des proprietees presentent dans notre fichier .json où l' on souhaite rechercher"] Syntaxe toujours dans un array et entre guillemets, ici j en ai mit qu une mais on peut en mettre plusieurs selon combien en contient notre .json ex: keys : ['title', 'name','age', ...]


	const results = fuse.search('d');
	console.log(results);
	//Ensuite on creer une const results. results renvoie un tableau dans lequel on y place le resultats du fitre fuse.js en fonction du match. Ici pour tester on a mit 'the b' mais après ce sera la recherche de l utilisateur. Il me propose 3 match . Voilà à quoi ça ressemble :

	// (3) [{…}, {…}, {…}]
	// 0: 
		// item: {title: 'The Book of Samson'}
		// refIndex: 2
		// score: 0.03162277660168379
		// [[Prototype]]: Object
	// 1: 
		// item: {title: 'The Preservationist'}
		// refIndex: 3
		// score: 0.3205001277290518
		// [[Prototype]]: Object
	// 2: 
		// item: {title: 'The Grand Design'}
		// refIndex: 1
		// score: 0.39508842614580647
		// [[Prototype]]: Object
	// length: 3
	// [[Prototype]]: Array(0)

	//Explication d' un object :
		// item: {title: 'The Book of Samson'} <= notre object .json
		// refIndex: 2 <= comment il se place dans notre fichier .json par rapport à ces deux autres fichier ici
		// score: 0.03162277660168379 <= le score de match


	const titleResult = results.map(result => result.item)
	console.log(titleResult);
	// Ici le but est de retourner nos objects .json. On va passer nos object dans un array en utilisant la methode map sur results. On passe en parametre une valeur courante puis on va prendre les items(ils contiennent nos objects .json) . Ca nous retourne un array comme ca : 
	// 	(3) [{…}, {…}, {…}]
	// 0: {title: 'The Book of Samson'}
	// 1: {title: 'The Preservationist'}
	// 2: {title: 'The Grand Design'}
	// length: 3
	// [[Prototype]]:  Array(0)

	// grace à ca on vas pouvoir afficher nos objects ou non, ou proposer une bar de recherche plus smooth pour les utilisateurs les erreurs seront moins restrictivent.








	// CODE POUR CETTE PAGE
	search.addEventListener("input", function() {
		const resu = fuse.search(this.value)
		console.log(resu);
		const titResu = resu.map(result => result.item.title);
		console.log(titResu);

		// permet de vider les valeurs précédente à chaque fois qu on ecoute l input
		containerSuggestion.innerHTML=``;

		titResu.forEach(title => {
			const listItem = document.createElement("div");
			listItem.textContent = title;

			listItem.addEventListener('click', () => {
				search.value = title;
				// Vide les suggetions une fois le choix cliqué.
				containerSuggestion.innerHTML = '';
			});

			containerSuggestion.appendChild(listItem);

		})
		
	})
	



}



//https://www.fusejs.io/getting-started/installation.html
//https://www.youtube.com/watch?v=GZl-yEz4_qw&list=LL&index=4



// Pour mon projet restaurant je vais l appliquer sur ma bar de recherche. Sinon le mieux serait de creer un .json avec tous les plats puis d' appliquer le filtre avec l' aide de fuse.js sur le .json lui meme pour faire apparaitre ou disparaitre les items selon la recherche de l utilisateur. Mais vu qu on va voir PHP j' ai pas envie de perdre mon temps à appliquer ça sur mon projet restaurant mais je vais le faire à petite echelle peut être ici.








