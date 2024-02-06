from node:lts
ARG GID=1001
ARG UID=1001
COPY . /app
WORKDIR /app
RUN getent group ${GID} || groupadd -g ${GID} dev
RUN getent passwd ${UID} || useradd -m -u ${UID} -g ${GID} -s /bin/bash dev
CMD ["npm", "run", "watch"]
