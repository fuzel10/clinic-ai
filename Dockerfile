FROM node:18

WORKDIR /app

COPY package.json ./
RUN npm install

# Install Playwright dependencies
RUN npx playwright install --with-deps

COPY . .

EXPOSE 3000

CMD ["node", "runner.js"]
