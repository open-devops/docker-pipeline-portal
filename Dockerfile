#
# Portal Image for Open DevOps Pipeline
#
FROM node:latest

MAINTAINER Open DevOps Team <open.devops@gmail.com>

ENV APP_HOME /opt/pipeline-portal/

RUN mkdir -p $APP_HOME /home/nodejs && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs -s /sbin/nologin nodejs && \
    chown -R nodejs:nodejs /home/nodejs

WORKDIR $APP_HOME
COPY package.json typings.json $APP_HOME
RUN npm install --unsafe-perm=true

COPY . $APP_HOME
RUN chown -R nodejs:nodejs $APP_HOME
USER nodejs

CMD cat app/plconfig/model/capability-template.ts.template |sed s/PORTAL_LOCALHOST/${PORTAL_LOCALHOST}/g >app/plconfig/model/capability-template.ts && \
    cat app/common/config/systemconfig.ts.template |sed s/PORTAL_LOCALHOST/${PORTAL_LOCALHOST}/g >app/common/config/systemconfig.ts && \
    npm start
