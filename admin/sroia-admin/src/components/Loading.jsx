// מצב טעינה בתוך עמוד: עיגול מסתובב קטן + טקסט
const Loading = ({ text = 'טוען...', className = '' }) => (
    <div role="status" className={`flex items-center justify-center gap-3 py-12 text-[#565f52] ${className}`}>
        <span aria-hidden="true"
            className="w-6 h-6 rounded-full border-[3px] border-sroia-edge border-t-sroia-green motion-safe:animate-spin" />
        {text}
    </div>
)

export default Loading
