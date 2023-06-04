FROM ubuntu:22.04
RUN apt-get update && apt-get install -y ca-certificates curl git gnupg sudo vim zsh 
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs
RUN npm install --global yarn

# install docker
RUN mkdir -m 0755 -p /etc/apt/keyrings
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
RUN echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt-get update && apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Set up non-root user
ARG USERNAME=user
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN groupadd --gid $USER_GID $USERNAME \
  && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
  && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
  && chmod 0440 /etc/sudoers.d/$USERNAME
USER $USERNAME

# Set up zsh with nice defaults
ENV SHELL=/usr/bin/zsh
ENV EDITOR=/usr/bin/vim
RUN git clone --depth=1 https://github.com/romkatv/powerlevel10k.git /home/${USERNAME}/powerlevel10k
COPY ./assets/.zshrc /home/${USERNAME}/
COPY ./assets/.p10k.zsh /home/${USERNAME}/
