<div align="center">
  <h1>ava</h1>
    <p>🤖 ava is a virtual personnal assistant powered by AI</p>
    
[Download]() - [Discord]() - [Support Me]()
  <hr>
</div>

## 📚 Table Of Content
- [🧪 Technologies](#🧪-technologies)
- [🚀 Installation](#🚀-installation)
- [📝 Commits](#📝-commit)
<hr>

## 🧪 Technologies
- API: Fastify
- Web application: Vite / React / Redux Toolkit / Three / React-Three-Fiber
- Database: PostgresQL
- Core: Python microservices

## 🚀 Installation

### Prerequesites
> 💡 ava has been tested on Windows and Ubuntu environment with theses versions only. You can try to use another but somes things can don't work correctly
- Node.js >= 20.9.0
- yarn >= 1.22.19

```bash
# Install yarn (if needed)
npm install --global yarn 
# Configure your own environment variables from the template
cp ./docs/.env.example ./.env 
# Install dependencies
yarn install
# Start the development
yarn dev
```
> 💡 You can see the list of all mandatories environment variables [here](./docs/ENVIRONMENT.md)
<hr>

## 📝 Commit

[I used this convention](https://gitmoji.dev/)
| Label            | Code                     | Emoji |
|------------------|--------------------------|-------|
| Feature          | `:sparkles:`             | ✨   |
| Deploy           | `:rocket:`               | 🚀   |
| Documentation    | `:memo:`                 | 📝   |
| Performance      | `:zap:`                  | ⚡️   |
| Testing          | `:white_check_mark:`     | ✅   |
| Fix Pipelines    | `:rotating_light:`       | 🚨   |
| Work In Progress | `:construction:`         | 🚧   |
| Experiment       | `:alembic:`              | ⚗️   |
| Architecture     | `:building_construction` | 🏗️   |
| New dependency   | `:heavy_plus_sign:`      | ➕   |
| Refactor         | `:recycle:`              | ♻️   |

# Roadmap

[] Intégrer les services d'OpenAI
[] Commencer à écouter l'utilisateur lors de l'utilisation du mot "ava"
[] Brancher le chat et utiliser des Observables
[] Transcrire les phrases d'un utilisateurs puis les envoyer directement au chatbot
[] Button Text To Speech
[] Intégration R3F for make ava alive
[] Synchronisation labiale lors du TTS
[] Page de personnalisation du personnage
[] Terminer la page de configuration
[] Utilisation de variables d'environnement pour la config
[] Utilisation de Ready Player Me
[] Démarrer une documentation / blog
[] Améliorer l'architecture
[] Add keybinds
[] Auto updater
[] Packager l'application
[] Release beta 1

# Paramètres Audio
Activation du Micro
- Détection de la voix
- Appuyer pour parler

# Paramètres Langue

