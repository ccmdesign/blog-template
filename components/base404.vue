<template>
    <div class="not-found">
        <stack-l class="not-found__info">
            <div class="not-found__title">
                <b>Oops...</b>
                <p>Page not found</p>
            </div>
            <p class="not-found__text">This Page doesn`t exist or was removed!<br/>We suggest you  back to home.</p>
            <nuxt-link to="/" class="button" visual="primary" color="primary">Back to home</nuxt-link>
        </stack-l>
        <image404 />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .not-found {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media screen and (max-width: 48em) {
            flex-direction: column;
            gap: var(--s2);
        }
    }

        .not-found__info {
            --space: var(--s3);
            @media screen and (max-width: 48em) {
                --space: var(--s1);
            }
        }

        .not-found__title {
            font-size: 3em;
            font-weight: 400;
        }
</style>