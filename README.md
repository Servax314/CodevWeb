# CodevWeb

CodevWeb is a format converter website based on the handwritting recognition API Google Vision for the use of IMT Atlantique students. To use acces the main page, one need to provide an @imt-atlantique email address to register and login. 

The main feature of the website is to convert a picture of a hanwritten document and convert it to a text file to be downloaded by the user.

The site is not deployed yet, therefor a server has to be launched locally. To do so, some gitignored files are required such as 'keys.js' or 'gcp-keys.json' to access the Atlas databse and to use the GCP service. To make it work, a file 'keys.js' containing the key to an Atlas cluster is to be put inside the file 'config/' and a file'gcp-keys.json' containing the GCP credential for the Google Vision API need to be inserted in the main directory. Here is a useful doc the the Google authentication process https://cloud.google.com/docs/authentication/getting-started.

Once done, it is time to download all the dependencies. For that you need npm installed to run 'npm install' in the CodevWeb directory.

Finally, while still in the CodevWeb directory, run 'sudo npm start dev' to launch the local server. The sudo command is used here to enable the local storage of the uploaded images.

# The team

Hugo Bouchez worked on an implementation of a ML algorithm to detect hanwritten text in an image. The algorithm was written in python using sklearn, a second implementation was written using the Tensorflow framework for python. For now, the algorithm is not integrated to the website, the Google Vision API is used as a placeholder.

Mathieu Pierronne worked on the frontend of the website on the view .html and .css. Outside the scope of programming, Mathieu wrote the specifications and a report on the project : https://github.com/Servax314/Codev-report.

Paul Michel worked on the frontend of the website on the view .html and .css.

Nicolas Servot designed the backend using nodeJS, Express and MongoDB. I also wrote the .js files for the frontend.

All four of us are 3rd year IMT Atlantique student. This project is part of our engineering training. 
