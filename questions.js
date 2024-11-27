// Define all questions with unique IDs
const questionsList = [
{ id: 1, text:"Je n’aimerais pas travailler dans une grande entreprise, parce que je n’aurais jamais une vue d’ensemble de ce sur quoi je travaille.  "},
{ id: 2, text:"Lorsque je vais voir des amis, je parle avec joie de tout sujet qui peut sortir dans la conversation.  "},
{ id: 3, text:"J’évite de me fixer des buts, de peur de ne pas les atteindre.  "},
{ id: 4, text:"Je me préoccupe plus de ce que j’ai accompli que de mon poste et mon titre au travail.  "},
{ id: 5, text:"Je ne pense que rarement à l’avenir. J’aime me laisser entraîner par les choses telles qu’elles se présentent.  "},
{ id: 6, text:"Pour moi, les choses sont soit justes soit fausses. Les discutions sur les « zones grises » me mettent mal à l’aise, et me semblent compromettre la vérité.  "},
{ id: 7, text:"Lorsque je prends une décision, j’ai le sentiment que plus d’une option pourraient être un bon choix.  "},
{ id: 8, text:"Lorsque je me fixe un but, je me consacre à la poursuite de ce but, même si d’autres parties de mon existence doivent en souffrir.  "},
{ id: 9, text:"Je suis toujours l’un des premiers à essayer d’innover.  "},
{ id:10, text:"J’ai tendance à ne m’associer qu’avec des gens qui ont le même statut social que moi.  "},
{ id:11, text:"Je suis persuadé que le temps est une denrée rare, et je lui attache un grand prix.  "},
{ id:12, text:"Quand ma voiture a besoin d’un réglage, je préfère la mener chez le garagiste, plutôt que laisser mon voisin s’en occuper devant son garage. Avec des professionnels, je sais que ce sera bien fait.  "},
{ id:13, text:"J’aime m’exécuter en public, parce que cela me pousse à faire mieux.  "},
{ id:14, text:"Dans l’achat d’une voiture, mes premiers critères sont le côté bon marché et la réputation de qualité et de fiabilité. Je ne laisse pas ma famille ou mes amis me pousser à dépenser plus pour « une marque ».  "},
{ id:15, text:"Mon bureau - ou mon plan de travail, est bien organisé : une place pour chaque chose, et chaque chose à sa place.  "},
{ id:16, text:"J’assiste à des conférences et lis des ouvrages spécialisés, afin de résoudre des questions importantes pour moi.  "},
{ id:17, text:"Si on m’offrait une promotion m’obligeant à déménager dans une autre ville, mes relations avec mes parents et mes amis ne me retiendraient pas.  "},
{ id:18, text:"Je trouve difficile de communiquer avec des gens dont la situation au travail ou dans la société est notamment supérieure à la mienne.  "},
{ id:19, text:"Je porte toujours une montre, et je m’y réfère régulièrement afin de ne jamais être en retard.  "},
{ id:20, text:"Je suis très frustré si on me traite comme un banal cliché sans personnalité.  "},
{ id:21, text:"J’ai tendance à ne pas m’inquiéter à l’avance. J’attends que le problème se présente avant de réagir.  "},
{ id:22, text:"Lorsque je fais la queue, j’ai tendance à engager la conversation avec des gens que je ne connais pas.  "},
{ id:23, text:"Je déteste arriver en retard. Parfois, j’évite de me rendre quelque part,… plutôt que d’y être en retard.  "},
{ id:24, text:"Celui qui veut stopper une discussion et pousser le groupe à prendre une décision m’irrite un peu ; spécialement si tout le monde n’a pas eu la chance de donner son opinion.  "},
{ id:25, text:"Je planifie ma journée et ma semaine. Je suis agacé si mon programme - ma routine - est dérangé.  "},
{ id:26, text:"Dans une discussion, je ne prends pas parti avant d’avoir entendu tous les arguments.  "},
{ id:27, text:"Je ne suis pas satisfait avant d’avoir terminé mon travail.  "},
{ id:28, text:"J’aime sortir de ma routine et faire de temps à autre quelque chose de tout à fait différent.  "},
{ id:29, text:"Si je suis engagé dans un projet, j’ai tendance à y travailler jusqu’à ce que ce soit fini, même si cela implique être en retard dans d’autres domaines.  "},
{ id:30, text:"En dehors de chez moi, je ne mange que dans certains lieux publics, où je sais que la nourriture est de la meilleure qualité et je peux trouver ce que j’apprécie.  "},
{ id:31, text:"Même si la pluie menaçait, je répondrais à l’invitation d’un ami à un barbecue, plutôt que m’excuser sous prétexte que je dois réparer mon toit gâté par une tempête.  "},
{ id:32, text:"Je me soumets toujours à l’autorité de mon patron, de mon pasteur et de mes enseignants, même si je pense qu’ils pourraient avoir tort.  "},
{ id:33, text:"J’estime qu’il existe une grammaire anglaise standard, et que tous les Américains devraient s’y plier.  "},
{ id:34, text:"Pour rendre les repas plus intéressants, j’introduis des variations dans les recettes des livres de cuisine.  "},
{ id:35, text:"Je défends ma position jusqu’à la fin, même si je sais que j’ai tort.  "},
{ id:36, text:"Je pense que tout ce que j’ai fait autrefois importe peu. Je dois faire mes preuves chaque jour à nouveau.  "},
{ id:37, text:"Si je prends un nouvel emploi, je travaille très dur afin de faire ma place parmi mes collègues.  "},
{ id:38, text:"Si je présente quelqu’un d’important, je mentionne en général sa profession et son  titre.  "},
{ id:39, text:"Je parle de mes problèmes avec d’autres et leur demande leurs avis.  "},
{ id:40, text:"J’évite de jouer à des jeux auxquels je ne suis pas très bon.  "},
{ id:41, text:"Même si je fais une course pour quelqu’un et que je suis pressé, je m’arrêterai pour parler avec un ami.  "},
{ id:42, text:"Je me suis fixé des buts à atteindre pour l’année prochaine et pour les cinq ans à venir.  "},
{ id:43, text:"J’aime être engagé dans beaucoup de choses. Je peux ainsi choisir à tout moment ce que je vais faire.  "},
{ id:44, text:"Lors d’un achat important, je demande d’abord l’avis d’un spécialiste, et j’achète ensuite ce qu’il m’a recommandé dans le magasin le plus proche ; à un prix raisonnable toutefois.  "},
{ id:45, text:"J’aime regarder une œuvre d’art, essayer de deviner la pensée de l’artiste, et tenter de communiquer avec lui.  "},
{ id:46, text:"Je me sens mal à l’aise et frustré, lorsqu’une discussion se termine sans qu’on n’ait rien décidé de clair sur le sujet. Personne n’en sort gagnant.  "},
{ id:47, text:"Je m’oppose à une vie programmée. Je préfère faire les choses comme elles viennent.  "},
{ id:48, text:"Si je préside une réunion, je fais attention à ce qu’elle commence et finisse à l’heure prévue.  "},
];

// Define group names/labels
const groupLabels = {
    group1: "Orientation vers le temps",
    group2: "Orientation vers l'événement",
    group3: "Pensée analytique",
    group4: "Pensée holistique",
    group5: "Orientation vers les crises",
    group6: "Orientation vers l'absence de crise",
    group7: "Orientation vers la tâche",
    group8: "Orientation vers la personne",
    group9: "Recherche de statut",
    group10: "Recherche de l'accomplissement",
    group11: "Refus de montrer sa vulnérabilité",
    group12: "Acceptation de montrer sa vulnérabilité",
    group13: "Orientation vers la culpabilité",
    group14: "Orientation vers la honte"
};

// Define which questions belong to which groups
const groupQuestions = {
    group1:  [11,19,23,25,48],    // question IDs that belong to group1
    group2:  [5,24,29,31,47],    // question IDs that belong to group2
    group3:  [6,10,15,33,46],    // some questions appear in multiple groups
    group4:  [1,7,20,26,45],
    group5:  [6,12,16,30,44],
    group6:  [7,9,21,34,43],
    group7:  [8,12,17,27,42],
    group8:  [2,39,22,31,41],
    group9:  [10,18,32,33,38],
    group10:  [4,14,20,36,37],
    group11:  [3,23,32,35,40],
    group12: [9,13,28,34,39],
    group13: [1,3,7,10,12],
    group14: [2,4,8,9,11],
};

// Create the sequential questions array for the questionnaire
const questions = questionsList.map(q => ({
    ...q,
    groups: Object.entries(groupQuestions)
        .filter(([group, questionIds]) => questionIds.includes(q.id))
        .map(([group]) => group)
}));

// Helper function to get questions for a specific group
function getQuestionsForGroup(groupId) {
    const questionIds = groupQuestions[groupId];
    return questionIds.map(id => questionsList.find(q => q.id === id));
} 