## Small business

### Local setup 
- Clone [SmallBusiness](https://github.com/ndedhia1210/smallBusiness) 
```
https://github.com/ndedhia1210/smallBusiness.git
```

- Build project locally 
```
npm i
```

- Set Mongo uri on local machine using (Please collect **MongoURI** this from MongoOwner)
```
export MONGO_CONNECTION_STRING="<MongoURI>"
````

- Source bash_profile
```
source ~/.bash_profile 
```

- Run App locally
```
npm start
```

- Visit following Url to test local instance
```
http://localhost:3000/
```


### How to push
- git add .
- git commit -m "< Add your message >"
- git push -u origin main


### How to deploy?
- Just commit your changes and push it to Master it will automatically get deployed
- For some reason it does not get deployed then go to Cyclic.sh and perform manual deployment

### Post deployment
- Verify changes using live App link (Please collect link from Code owner)
