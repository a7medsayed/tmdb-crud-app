FROM node:20

WORKDIR /app

# Copy only package files first for better caching
COPY package.json ./

RUN npm install --force

# Copy the rest of the app
COPY . .

RUN npm run build

RUN chmod +x run.sh

EXPOSE 8080

CMD ["./run.sh"]