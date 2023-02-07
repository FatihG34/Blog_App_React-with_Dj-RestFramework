FROM node:19-slim
WORKDIR /frontend
COPY . .
RUN yarn
EXPOSE 3000
CMD ["yarn", "start"]
