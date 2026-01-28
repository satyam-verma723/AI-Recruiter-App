// lib/videoUploadService.js

export class VideoUploadService {
  static async uploadVideo(blob, fileName, supabase, onProgress = null) {
    if (blob.size > 50 * 1024 * 1024) {
      return await this.uploadInChunks(blob, fileName, supabase, onProgress);
    }

    return await supabase.storage
      .from("interview-media")
      .upload(`recordings/${fileName}`, blob, {
        upsert: false,
      });
  }

  static async uploadInChunks(blob, fileName, supabase, onProgress = null) {
    const CHUNK_SIZE = 20 * 1024 * 1024;
    const totalChunks = Math.ceil(blob.size / CHUNK_SIZE);
    let uploaded = 0;

    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, blob.size);
      const chunk = blob.slice(start, end);

      const { error } = await supabase.storage
        .from("interview-media")
        .upload(
          `recordings/chunks/${fileName}.part${i}`,
          chunk,
          { upsert: false }
        );

      if (error) throw error;

      uploaded += chunk.size;
      if (onProgress) {
        onProgress((uploaded / blob.size) * 100);
      }
    }

    return { path: `recordings/chunks/${fileName}` };
  }

  static async getVideoUrl(path, supabase) {
    const { data } = supabase.storage
      .from("interview-media")
      .getPublicUrl(path);

    return data.publicUrl;
  }
}
