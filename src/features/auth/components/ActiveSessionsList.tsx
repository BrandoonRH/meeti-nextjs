import { Heading } from "@/src/shared/components";
import { authServices } from "../services/AuthService";
import { formatUserAgent } from "@/src/shared/utils/user-agent";
import RevokeSessionButton from "./RevokeSessionButton";

export default async function ActiveSessionsList() {
  /* const sessions = await authServices.getSessions();
  const currentSession = await authServices.getSession();  */

  const [sessions, currentSession] = await Promise.all([
    authServices.getSessions(),
    await authServices.getSession(),
  ]);

  const isCurrentDevice = (currentSessionId: string) =>
    currentSessionId === currentSession?.session.id;
  return (
    <>
      <Heading level={2} className="mt-10">
        Sesiones Activas
      </Heading>
      <div className="mt-10 p-5 border border-gray-200">
        {sessions.map((session) => (
          <div key={session.id} className="p-5 shadow-xs flex items-center">
           <div className="flex gap-2 items-center flex-1">
             <p>{formatUserAgent(session.userAgent!)} </p> {" "}
            {isCurrentDevice(session.id) && (
              <p className="text-green-600 font-bold bg-green-200 border border-green-200 rounded-md inline-block px-3 py-1 uppercase text-xs">
                Este Dispositivo
              </p>
            )}
           </div>
           <RevokeSessionButton token={session.token}/>
          </div>
        ))}
      </div>
    </>
  );
}
