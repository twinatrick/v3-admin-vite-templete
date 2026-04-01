FROM node:18.16.1 AS builder

# Define build arguments for environment variables
#ARG BASE_API='/base_api_not_set'
#ARG GOOGLE_APP_ID
#ARG GOOGLE_CLIENT_ID
#ARG GOOGLE_API_KEY
#ARG ROUTER_HISTORY='history'

# Set environment variables during the build process
#ENV VITE_BASE_API=${BASE_API}
ENV VITE_BASE_API='/api/v1'
ENV VITE_ROUTER_HISTORY=${ROUTER_HISTORY}
ENV VITE_PUBLIC_PATH='/'
#ENV VITE_GOOGLE_APP_ID=$GOOGLE_APP_ID
#ENV VITE_GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
#ENV VITE_GOOGLE_API_KEY=$GOOGLE_API_KEY

COPY . .

RUN rm .env.*
RUN npm install --global pnpm@8.6.5
RUN pnpm install
RUN pnpm run build:dev

FROM nginx:1.21.3

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3333
COPY --from=builder /dist /usr/share/nginx/html
