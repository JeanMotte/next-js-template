FROM node:22

# Set environment variables
ENV APP_FOLDER=/app/ \
    WORKSPACE=/app/workspace \
    HOME=/home/node \
    PATH=$PATH:/home/node/.local/bin

# Install essential tools and set up the environment
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git wget iputils-ping curl gnupg2 sudo \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node \
    && mkdir -p $APP_FOLDER \
    && chown node:node $APP_FOLDER

# Set the working directory
WORKDIR $WORKSPACE

# Switch to the node user
RUN corepack enable

USER node

# [Optional] Uncomment this line to install global node packages.
# RUN npm install -g <your-package-here>

CMD [ "sleep", "infinity" ]
