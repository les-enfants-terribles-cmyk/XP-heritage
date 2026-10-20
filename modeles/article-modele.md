---
# Copier ce fichier dans src/articles/ et le renommer AAAA-MM-JJ-nom-du-jeu.md
title: "Nom du jeu, son verdict : X/10"
date: AAAA-MM-JJ
# Une des rubriques : test-du-mois, questions-du-gamer, coin-des-parents, jeux-de-papa, carnet-de-progres
rubrique: test-du-mois
resume: "Une phrase qui donne envie de lire, affichée dans la liste des articles."

# --- Fiche du jeu (supprimer ce bloc pour un article sans jeu) ---
jeu: "Nom du jeu"
pegi: 7
pegiNote: ""            # ex. "joué uniquement en ma présence" (laisser vide sinon)
motsGamer: ["Mot 1", "Mot 2", "Mot 3"]
note: 8                 # sa note sur 10
conseilleA: "À qui il le conseille"

# --- Ce qu'il a gagné en jouant (2 à 4 lignes) ---
xp:
  - "Compétence ou découverte, et en quoi"
# --- Image en tête d'article (facultatif). Fichier d'origine dans src/photos/ ---
# illustration: "dessin-du-jeu.jpg"
# illustrationAlt: "Description pour les malvoyants"
# illustrationLegende: "Légende, par exemple : Le Roi-Singe vu par Young Gojo"
---

Introduction du parent : comment le jeu est arrivé à la maison, en 2 ou 3 phrases.

## Le jeu, expliqué par lui

{% gamer %}
Ses mots, tels qu'il les a dits.
{% endgamer %}

## Les questions confidences

### Question posée ?

{% gamer %}
Sa réponse.
{% endgamer %}

{% papa %}
Le mot du parent (facultatif) : ce que j'ai observé, le contexte.
{% endpapa %}

{# Une image au milieu du texte :
{% image "nom-du-fichier.jpg", "Description pour les malvoyants", "Légende facultative" %} #}

## Le coin des parents

Le cadre : PEGI, durée, présence, ce qu'on surveille.

## Le bilan

Deux phrases pour conclure.
