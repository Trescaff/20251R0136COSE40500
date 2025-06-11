terraform {
    required_providers {
        azurerm = {
        source  = "hashicorp/azurerm"
        version = "4.16.0"
        }
    }
}

provider "azurerm" {
    features {}
    subscription_id = "881367b5-165a-423a-8356-a415679119b1"
}