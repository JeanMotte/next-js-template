# syntax=docker.io/docker/dockerfile:1

# 1. Base Image
FROM node:22-alpine AS base
WORKDIR /app
# Ensures yarn/npm/pnpm commands are available from the base image
RUN corepack enable

# 2. Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock ./
# Installs ALL dependencies, including devDependencies, INSIDE the image
RUN yarn --frozen-lockfile

# 3. Builder (For Production)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# 4. Runner (For Production Runtime)
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

# ==================================================================
# 5. NEW: The Development Stage (For Dev Container and local dev)
# ==================================================================
FROM deps AS development
# The `deps` stage already has our full node_modules.
# The `base` image already has the `node` user needed by devcontainer.json.
USER node
# The command can be set here, but is usually overridden by docker-compose.
CMD ["yarn", "dev"]