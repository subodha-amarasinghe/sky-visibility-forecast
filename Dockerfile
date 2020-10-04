FROM node:latest
WORKDIR /code
EXPOSE 4000
COPY ./backend .
RUN npm install 
CMD ["npm", "start"]
