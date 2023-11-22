# Introduction au DevOps

## Sujet 

developper un processus de CD 

modules nécéssaires :
-Repo github
-Github workflow
-Server listener
-Script shell

Lors du push d'une nouvelle codebase sur votre repository, le workflow github devra builder une nouvelle image docker de votre projet, et push cette image sur dockerhub.

Une fois l'image push sur docker hub, votre github workflow enverra une requête au server listener que vous avez développé.

Lors de la recepetion de cette requête le serveur lancera l'execution d'un script shell qui devrait pull cette nouvelle version 