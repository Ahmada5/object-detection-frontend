<template>
    <div class="base-input d-flex flex-column justify-center align-center mt-10">
        <v-container>
            <v-card class="bg-grey">
                <v-card-title>
                    <div class="base-input__head d-flex align-center justify-center">
                        <p>this is head</p>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-row class="mt-1">
                        <v-col class="d-flex flex-column align-center justify-center">
                            <span class="flex justify-start">Input your image</span>
                            <div class="base-input__input-file">
                                <v-file-input
                                    v-model="selectedFile"
                                    prepend-icon="" variant="outlined"
                                    counter clearable
                                    :show-size="1000"
                                />
                            </div>
                            <v-btn class="ml-5" variant="tonal" @click="onClickButton"> Send </v-btn>
                        </v-col>
                        <v-col class="d-flex flex-column align-center justify-center">
                            <span class="flex justify-start">{{massageBack}}</span>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-container>
    </div>

</template>

<script lang="ts">
import axios from 'axios';
import {Component, Vue} from 'vue-facing-decorator'

@Component
export default class Test extends Vue {
    selectedFile: File | null = null;
    finalBase64File: string | null = null;

    massageBack: string = 'no massage';

    onClickButton() {
        if (this.selectedFile) {
            console.log(this.selectedFile);
            console.log("wait");
            this.convertToBase64(this.selectedFile).then(() => {
                this.sendToServer(this.finalBase64File);
            }).catch(error => {
                console.error('Error converting file to base64:', error);
            });
        } else {
            console.log('No file selected');
        }
    }

    convertToBase64(file: File): Promise<void> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.finalBase64File = reader.result as string;
                resolve();
            };
            reader.onerror = error => reject(error);
        });
    }

    async sendToServer(base64: string | null) {
        try {
            const response = await axios.post('http://192.168.90.126:5000/upload', { image: base64 });
            this.massageBack = response.data.message;
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        }
    }

}
</script>

<style lang="scss">
    .base-input{

        .v-input__control {

            .v-field-label{
                padding-bottom: 12px;
            }
        }

        .v-col{
            background-color: #747bff;
            height: 400px;
            margin: 20px;
        }

        &__head{
            background-color: #535bf2;
            height: 100px;
        }

        &__input-file{
            width: 50%;
        }
    }
</style>