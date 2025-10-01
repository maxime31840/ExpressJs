const occurence = (chaine, car) => {
    let compteur = 0;

    for (let i = 0; i < chaine.length; i++) {
        if (chaine[i] === car) {
            compteur++;
        }
    }

    return `Le nombre d'occurrence de [${car}] dans la chaîne [${chaine}] est [${compteur}] !`;
}

module.exports = { occurence };

