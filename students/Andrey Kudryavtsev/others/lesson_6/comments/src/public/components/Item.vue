<template>
    <div>
        <div class="user">
            <strong>{{ item.name }}</strong>
        </div>
        <div class="post-body">
            <p>{{ item.body }}</p>
        </div>
        <div class="post-footer">
            <a href="#">{{ item.mail }}</a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object
        }
    }
}
</script>
