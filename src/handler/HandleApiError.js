function HandleApiError(error) {
    if (error.response) {
        const { status, data } = error.response;

        switch (status) {
            case 400:
                return data || "Dados inválidos. Por favor, revise sua solicitação.";
            case 401:
                return data || "Você não tem permissão para realizar esta ação.";
            case 404:
                return data || "O recurso solicitado não foi encontrado.";
            case 500:
                return "Ocorreu um erro no servidor. Tente novamente mais tarde.";
            default:
                return "Ocorreu um erro inesperado. Tente novamente.";
        }
    } else if (error.request) {

        return "Não foi possível conectar ao servidor. Verifique sua conexão.";
    } else {

        return "Erro ao processar a solicitação. Tente novamente.";
    }
}
export default HandleApiError;