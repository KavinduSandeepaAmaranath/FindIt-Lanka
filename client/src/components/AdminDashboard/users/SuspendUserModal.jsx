import {
  suspendIcons,
  suspendContent,
} from "../../../data/AllUsersData";


const SuspendUserModal = ({ user, onClose }) => {
  if (!user) return null;


  const {
    close: CloseIcon,
    warning: WarningIcon,
    userSuspend: UserSuspendIcon,
  } = suspendIcons;


  const handleSuspend = () => {
    console.log("Suspending user:", user.id);

    onClose();
  };


  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
        p-3
        sm:p-5
        overflow-y-auto
      "
    >


      {/* Modal */}
      
      <div
        className="
          w-full
          max-w-md
          sm:max-w-lg
          bg-white
          rounded-2xl
          sm:rounded-3xl
          shadow-2xl
          overflow-hidden
          max-h-[95vh]
          flex
          flex-col
        "
      >


        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            px-4
            sm:px-6
            py-4
            sm:py-5
            border-b
            border-gray-200
          "
        >

          <div className="flex items-center gap-3 min-w-0">


            <div
              className="
                flex-shrink-0
                w-10
                h-10
                sm:w-11
                sm:h-11
                flex
                items-center
                justify-center
                rounded-full
                bg-red-100
                text-red-600
              "
            >
              <UserSuspendIcon
                size={20}
                className="sm:w-[22px] sm:h-[22px]"
              />
            </div>



            <div className="min-w-0">

              <h2
                className="
                  text-base
                  sm:text-xl
                  font-semibold
                  text-gray-800
                  truncate
                "
              >
                {suspendContent.title}
              </h2>


              <p
                className="
                  text-xs
                  sm:text-sm
                  text-gray-500
                "
              >
                {suspendContent.subtitle}
              </p>


            </div>


          </div>



          <button
            onClick={onClose}
            className="
              flex-shrink-0
              text-gray-500
              hover:text-red-600
              transition
            "
          >
            <CloseIcon size={22}/>
          </button>


        </div>





        {/* Scrollable Body */}

        <div
          className="
            overflow-y-auto
            px-4
            sm:px-6
            py-5
            sm:py-6
          "
        >


          {/* Warning Box */}

          <div
            className="
              flex
              items-start
              gap-3
              bg-red-50
              border
              border-red-200
              rounded-xl
              p-3
              sm:p-4
            "
          >

            <WarningIcon
              className="
                text-red-600
                flex-shrink-0
                mt-1
              "
              size={20}
            />


            <p
              className="
                text-xs
                sm:text-sm
                text-gray-700
                leading-relaxed
              "
            >

              Are you sure you want to suspend{" "}

              <span className="font-semibold text-red-600">
                {user.name}
              </span>

              ?

              <br />

              {suspendContent.warningText}

            </p>


          </div>





          {/* User Information */}

          <div
            className="
              mt-5
              bg-gray-50
              rounded-xl
              p-4
              space-y-3
              text-xs
              sm:text-sm
            "
          >


            <div
              className="
                flex
                justify-between
                gap-4
              "
            >

              <span className="text-gray-500">
                User ID
              </span>

              <span className="font-medium text-right">
                {user.id}
              </span>

            </div>



            <div
              className="
                flex
                justify-between
                gap-4
              "
            >

              <span className="text-gray-500">
                Email
              </span>


              <span
                className="
                  font-medium
                  text-right
                  truncate
                  max-w-[180px]
                  sm:max-w-[220px]
                "
              >
                {user.email}
              </span>

            </div>




            <div
              className="
                flex
                justify-between
              "
            >

              <span className="text-gray-500">
                Status
              </span>


              <span
                className="
                  text-green-600
                  font-semibold
                "
              >
                {user.status}
              </span>


            </div>


          </div>


        </div>







        {/* Footer */}

        <div
          className="
            flex
            flex-col-reverse
            sm:flex-row
            justify-end
            gap-3
            px-4
            sm:px-6
            py-4
            sm:py-5
            border-t
            border-gray-200
          "
        >


          <button
            onClick={onClose}
            className="
              w-full
              sm:w-auto
              px-5
              py-2.5
              rounded-xl
              border
              border-gray-300
              text-gray-700
              text-sm
              hover:bg-gray-100
              transition
            "
          >
            {suspendContent.cancelButton}
          </button>




          <button
            onClick={handleSuspend}
            className="
              w-full
              sm:w-auto
              px-5
              py-2.5
              rounded-xl
              bg-red-600
              text-white
              text-sm
              hover:bg-red-700
              transition
              shadow-sm
            "
          >
            {suspendContent.confirmButton}
          </button>



        </div>


      </div>


    </div>
  );
};


export default SuspendUserModal;