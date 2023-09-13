FROM gitpod/workspace-full

USER gitpod

# Install dependencies
RUN sudo apt-get update && \
    sudo apt-get install -y gnupg software-properties-common

# Install Hashicorp GPG key
RUN wget -O- https://apt.releases.hashicorp.com/gpg | \
    gpg --dearmor | \
    sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg

# Verify fingerprint
RUN gpg --no-default-keyring \
    --keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg \
    --fingerprint

# Add Hashicorp repository to system
RUN echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
    https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
    sudo tee /etc/apt/sources.list.d/hashicorp.list

# Install Terraform
RUN sudo apt update && \
    sudo apt-get install -y terraform
