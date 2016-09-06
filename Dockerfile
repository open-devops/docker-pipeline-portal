#
# Portal Image for Open DevOps Pipeline
#
FROM node:latest

MAINTAINER Open DevOps Team <open.devops@gmail.com>

RUN mkdir -p /PipelinePortal /home/nodejs && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs -s /sbin/nologin nodejs && \
    chown -R nodejs:nodejs /home/nodejs

WORKDIR /PipelinePortal
COPY ./PipelinePortal/package.json ./PipelinePortal/typings.json /PipelinePortal/
RUN npm install --unsafe-perm=true

COPY ./PipelinePortal /PipelinePortal
RUN chown -R nodejs:nodejs /PipelinePortal
USER nodejs

CMD cat app/data/capabilities.json.template |sed s/PORTAL_LOCALHOST/${PORTAL_LOCALHOST}/g >app/data/capabilities.json && \
    cat app/common/config/systemconfig.ts.template |sed s/PORTAL_LOCALHOST/${PORTAL_LOCALHOST}/g >app/common/config/systemconfig.ts && \
    npm start
