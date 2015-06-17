FROM node 

RUN npm install --global gulp \
        && npm install -g bower

WORKDIR /src

ADD package.json /src/
RUN npm install

ADD . /src

RUN bower install --allow-root \
        && gulp deploy

EXPOSE 3000

CMD mkdir www/uploads
CMD chmod -R 777 www/uploads

ENTRYPOINT ["npm", "start"]