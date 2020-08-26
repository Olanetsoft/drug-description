function toBlock(userId, userName, csrf) {
    swal({
        title: `Are you sure you want to Block ${userName}?`,
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No.',
    }).then(async (result) => {
        if (result.value) {
            await fetch(`/admin/block/${userId}`, {
                method: 'PATCH',
                headers: {
                    
                    'X-CSRF-TOKEN': csrf,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            swal({
                title: 'Blocked!',
                text: `You have successfully Blocked ${userName} from Super Nigeria platform`,
                type: 'success',
            }).then(() => {
                window.location = '/admin/dashboard/users';
            });

        }
    });
}

function toUnBlock(userId, userName, csrf) {
    swal({
        title: `Are you sure you want to Unblock ${userName}?`,
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No.',
    }).then(async (result) => {
        if (result.value) {
            await fetch(`/admin/unblock/${userId}`, {
                method: 'PATCH',
                headers: {
                    'X-CSRF-TOKEN': csrf,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            swal({
                title: 'Un-Blocked!',
                text: `You have successfully Unblocked ${userName} from Super Nigeria platform`,
                type: 'success',
            }).then(() => {
                window.location = '/admin/dashboard/users';
            });

        }
    });
}