function toRemove(prescriptionId, drugName, csrf) {
    swal({
        title: `Are you sure you want to Remove ${drugName}?`,
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No.',
    }).then(async (result) => {
        if (result.value) {
            await fetch(`/remove/${prescriptionId}`, {
                method: 'PATCH',
                headers: {

                    'X-CSRF-TOKEN': csrf,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            swal({
                title: 'Removed!',
                text: `You have successfully Removed ${drugName} from your List`,
                type: 'success',
            }).then(() => {
                window.location = '/all-prescription';
            });

        }
    });
};

function toVerify(prescriptionId, drugName, csrf) {
    swal({
        title: `Are you sure you have completed ${drugName}?`,
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No.',
    }).then(async (result) => {
        if (result.value) {
            await fetch(`/verify/${prescriptionId}`, {
                method: 'PATCH',
                headers: {

                    'X-CSRF-TOKEN': csrf,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            swal({
                title: 'Completed!',
                text: `You have successfully Completed ${drugName}`,
                type: 'success',
            }).then(() => {
                window.location = '/all-prescription';
            });

        }
    });
};

